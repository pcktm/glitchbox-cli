module.exports = function (g) {
  while (g.hasNextFrame()) {
    let frame = g.nextFrame();
    const r = 5;

    if (frame.mv.forward) {
      // const h = frame.mv.forward.length;
      // const w = frame.mv.forward[1].length;
      // for (let i = 0; i < h; i++){
      //   for (let j = 0; j < w; j++) {
      //       if ((j - w/2)* (j - w/2) + (i - h/2) * (i - h/2) - (r*r) < 0) {
      //         frame.mv.forward[i][j][0] = 0;
      //         frame.mv.forward[i][j][1] = -10;
      //       }
      //   } 
      // }
      var i = 0;
      frame.mv.forward.forEach(vectorArray => {
        var j = 0;
        vectorArray.forEach(vector => {
          vector[0] = (Math.random() * vector[0] * Math.sin(i)).toFixed(5);
          vector[1] = (Math.random() * vector[1] * Math.sin(j)).toFixed(5);
          j++;
        });
        i++;
      });
      g.saveFrame(frame);
    }
  }
}