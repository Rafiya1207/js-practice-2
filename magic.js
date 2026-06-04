const True = (x) => (y) => x;
const False = (x) => (y) => y;

const not = (f) => f(False)(True);

not(True);
