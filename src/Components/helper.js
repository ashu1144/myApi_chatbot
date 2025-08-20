export function checkHeading(str) {
  return typeof str === 'string' && /^\*\*.*\*$/.test(str.trim());
}


export function cleanDoubleStars(line) {
  if (typeof line !== 'string') return line;

  // Trim, remove starting ** and trailing * or **
  return line
    .trim()
    .replace(/^(\*\*)/, '')    // remove starting **
    .replace(/(\*\*|\*)$/, '') // remove ending ** or *
    .trim();
}

export function anyWhereDoubleStars(line) {
  if (typeof line !== 'string') return line;

  return line
    .replace(/\*\*/g, '')   // remove all double asterisks
    .replace(/\*$/g, '')    // remove trailing single asterisk if any
    .trim();                // remove leading/trailing whitespace
}


