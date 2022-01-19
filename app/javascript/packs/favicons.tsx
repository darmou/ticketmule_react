
// eslint-disable-next-line no-undef
//@ts-ignore
const faviconsContext = require.context(
    '!!file-loader?name=../images/favicons/[name].[ext]!.',
    true,
    /\.(svg|png|ico|xml|json)$/
);faviconsContext.keys().forEach(faviconsContext);