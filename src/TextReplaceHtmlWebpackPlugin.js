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
                            const {search, replace} = pattern;

                            data.html = data.html.replace(new RegExp(search, "gi"), replace);
                        })
                    }
                    cb(null, data);
                }
            );
        });
    }
}

module.exports = TextReplaceHtmlWebpackPlugin;
