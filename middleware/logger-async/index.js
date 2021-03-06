// const log = ctx => {};

function log(ctx) {
    console.log(ctx.method, ctx.header.host);
}

module.exports = function() {
    return async function(ctx, next) {
        next();
        await log(ctx);
    };
};
