import {Command, flags} from '@oclif/command';
import { File, Converter, Processor, Frames } from 'glitchbox-core';
import fs from 'fs';
import FFpaths from "ffedit-static";
import Listr from "listr";
import tempy from "tempy";
import del from "del";
import path from "path";

class GlitchboxCli extends Command {
  static description = "";

  static args = [
    {
      name: "input",
      required: true,
      description: 'Input file',
      parse: input => path.resolve(process.cwd(), input)
    },
    {
      name: "script",
      required: true,
      description: 'Script that will process the frames',
      parse: input => path.resolve(process.cwd(), input)
    },
    {
      name: "output",
      required: true,
      description: 'Output destination',
      parse: input => path.resolve(process.cwd(), input)
    },
  ];

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    noAudio: flags.boolean({ description: "omit audio extraction" }),
    debug: flags.boolean({ description: "Output debug info and do not remove the temporary folder" }),
  };

  async run() {
    const { args, flags } = this.parse(GlitchboxCli);
    const converter = new Converter(FFpaths.ffmpeg, FFpaths.ffedit);
    const tempDir = tempy.directory();

    const file = new File(args.input, tempDir);
    const glitchManager = new Processor();

    const scriptPath = path.resolve(args.script);

    if(flags.debug) console.debug("Temporary directory: " + tempDir)

    const tasks = new Listr([
      {
        title: "Extract",
        task: () => {
          return new Listr([
            {
              title: "Load glitching script",
              task: () => glitchManager.loadGlitchingFunction(scriptPath),
            },
            {
              title: "Convert file to raw MPEG2",
              task: async () => await converter.toRawMPEG(file),
            },
            {
              title: "Extract audio",
              enabled: () => !flags.noAudio,
              task: async (ctx, task) => await converter.extractAudio(file).catch(() => {
                flags.noAudio = true;
                task.skip("Most likely no audio stream in file");
              }),
            },
            {
              title: "Extract feature from file",
              task: async () => await converter.extractFeature(file),
            },
          ]);
        },
      },
      {
        title: "Glitch!",
        task: () => {
          return new Listr([
            {
              title: "Process the extracted feature",
              task: async () => await glitchManager.glitch(file),
            },
            {
              title: "Apply modified feature to input",
              task: async () => await converter.bakeFeature(file),
            },
            {
              title: "Make the file playable",
              task: async () =>
                await converter.makePlayable(
                  file,
                  args.output,
                  !flags.noAudio
                ),
            },
          ]);
        },
      },
      {
        title: "Clean up",
        enabled: () => !flags.debug,
        task: async () => {
          await del([tempDir], {
            force: true,
          });
        },
      },
    ]);

    tasks.run().catch((err) => {
      console.error(err);
    });
  }
}

export = GlitchboxCli
