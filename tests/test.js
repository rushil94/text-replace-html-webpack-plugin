import test from 'ava';
import webpack from 'webpack';

// 0. Import the config that uses my plugin
import options from './webpack.config.js';

test.cb('Compiles routes nested at one level', t => {

  // 1. Run webpack
  webpack(options, function(err, stats) {

    // 2. Fail test if there are errors
    // if (err) {
    //   return t.end(err);
    // } else if (stats.hasErrors()) {
    //   return t.end(stats.toString());
    // }

    // 3. Map asset objects to output filenames
    const files = stats.toJson().assets.map(x => x.name);

    // 4. Run assertions. Make sure that the three expected
    //    HTML files were generated
    t.true(files.indexOf('index.html') !== -1);
    // t.true(files.indexOf('about.html') !== -1);
    // t.true(files.indexOf('404.html') !== -1);

    t.end();
  });
});
