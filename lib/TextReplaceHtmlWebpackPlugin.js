class TextReplaceHtmlWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('TextReplaceHtmlWebpackPlugin', (compilation) => {
            
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
                'TextReplaceHtmlWebpackPlugin',
                (data, cb) => {
                    data.html += 'The Magic Footer';
                    cb(null, data);
                }
            );
        });
    }
}

module.exports = TextReplaceHtmlWebpackPlugin;
