module.exports = function (g) {
  while (g.hasNextFrame()) {
    let frame = g.nextFrame();
    if (frame.mv.forward) {
      frame.mv.forward.forEach(el => {
        el.forEach(element => {
          const buf = Math.abs(element[1] - 1);
          element[1] = element[0] + 1;
          element[0] = buf;
        });
      });
      g.saveFrame(frame);
    }
  }
}