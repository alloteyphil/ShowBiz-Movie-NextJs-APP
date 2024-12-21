export const isPotentialSQLInjection = (input: string): boolean => {
  const regex =
    /\b(SELECT|INSERT|DELETE|UPDATE|DROP|UNION|ALTER|CREATE|EXEC|TRUNCATE|MERGE|CALL|USE)\b|--|#|'|"|;|\/\*|\*\/|xp_cmdshell/i;
  return regex.test(input);
};
