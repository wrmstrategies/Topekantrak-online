module.exports = async function (context, req) {
  const body = req.body || {};
  context.log('Join request', body);
  context.res = { status: 200, body: { ok: true } };
};
