import test from 'ava';
import webpack from 'webpack';
import fs from 'fs';
import path from 'path';

//Import the config
import options from './webpack.config.js';

test.cb('Compiles routes nested at one level', t => {

  //Run webpack
  webpack(options, function(err, stats) {

    //Fail test if there are errors
    if (err) {
      return t.end(err);
    } else if (stats.hasErrors()) {
      return t.end(stats.toString());
    }

    //Map asset objects to output filenames
    const files = stats.toJson().assets.map(x => x.name);

    console.log(
      stats.toString({
        context: path.resolve(__dirname, '..'),
        chunks: true,
        chunkModules: true,
        modules: false,
      })
    );
    if (stats.hasErrors()) {
      done(
        new Error(
          stats.toString({
            context: path.resolve(__dirname, '..'),
            errorDetails: true,
          })
        )
      );
      return;
    }

    //Check if index.html is created
    t.true(files.indexOf('index.html') !== -1);

    const expectedDirectory = path.resolve(
      __dirname,
      'expected'
    );

    for (const file of fs.readdirSync(expectedDirectory)) {
      const content = fs.readFileSync(
        path.resolve(expectedDirectory, file),
        'utf-8'
      );

      const actualContent = fs.readFileSync(
        path.resolve(__dirname, 'output', file),
        'utf-8'
      );

      //Checking if file generated matches file stored in expected folder
      t.deepEqual(actualContent, content, 'Replacement not working correctly')
    }

    t.end();
  });
});
