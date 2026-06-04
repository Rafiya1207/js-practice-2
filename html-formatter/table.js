const rows = `AWS / Terraform|Expert
Docker|Advanced`;

const formatRow = (row) => {
  const data = row.map((data) => {
    let cellData = data;
    if (data.includes("•")) {
      cellData = `<li>${data.replace("• ", "")}</li>`;
    }
    return `<td>${cellData}</td>`;
  });
  return `<tr>
  ${data.join("\n")}
  </tr>`;
};

const formattedRows = rows.split("\n").map((row) => {
  return formatRow(row.split("|"));
});

console.log(formattedRows.join(""));
