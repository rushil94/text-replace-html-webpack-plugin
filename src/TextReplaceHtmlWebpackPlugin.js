import isRegExp from 'lodash.isregexp';
import isString from 'lodash.isstring';

class TextReplaceHtmlWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('TextReplaceHtmlWebpackPlugin', (compilation) => {

            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
                'TextReplaceHtmlWebpackPlugin',
                (data, cb) => {

                    const {replacementArray} = this.options;

                    if(Array.isArray(replacementArray)) {
                        replacementArray.forEach((pattern) => {
                            const {searchString, replace, regex} = pattern;

                            if (searchString && regex) {
                                compilation.warnings.push(new Error(`TextReplaceHtmlWebpackPlugin => Provide either searchString (${searchString}) or regex (${regex}). If both are provided, regex will take precedence.`));
                            }

                            if(regex) {
                                if (isRegExp(regex)) {
                                    data.html = data.html.replace(regex, replace);
                                } else {
                                    compilation.warnings.push(new Error(`TextReplaceHtmlWebpackPlugin => regex : ${regex} : Invalid regex supplied.`));
                                    // console.log("");
                                }
                            } else if (searchString) {
                                if (isString(searchString)) {
                                    data.html = data.html.replace(new RegExp(searchString, "g"), replace);
                                }
                                else {
                                    compilation.warnings.push(new Error(`TextReplaceHtmlWebpackPlugin => searchString : ${searchString} : Invalid searchString supplied.`));
                                }
                            }
                        });
                    }

                    cb(null, data);
                }
            );
        });
    }
}

module.exports = TextReplaceHtmlWebpackPlugin;
