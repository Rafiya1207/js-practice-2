export const tableExists = (db, table_name) => {
  const stmt = db.prepare(`
  SELECT name
  FROM sqlite_master
  WHERE type = 'table'
    AND name = ?
`);
  return stmt.all(table_name).length === 1;
};
