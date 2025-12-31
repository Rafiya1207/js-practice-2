const totalBalance = (array) => array.reduce((sum, el) => sum + el, 0);

const readFile = async (file) =>
  await Deno.readTextFile(file)
    .catch((_) => "")
    .then((data) => data.split("\n").filter((line) => line));

const parseTransactions = (transactions) =>
  transactions.flatMap((transaction) => transaction.map(Number));

const extractDetails = (line) => {
  const [name, ...transactionFiles] = line.split(",");
  return {
    name,
    transactionFiles,
    balance: 0,
    transactionCount: 0,
  };
};

const parseCustomers = (data) => data.map(extractDetails);

const writeToFile = (data) =>
  Deno.writeTextFile("./data/databalance.txt", data);

const processTransactions = async (customer) => {
  const lines = await Promise.all(customer.transactionFiles.map(readFile));
  const transactions = parseTransactions(lines);
  customer.balance = totalBalance(transactions);
  customer.transactionCount = transactions.length;
  return [customer.name, customer.transactionCount, customer.balance];
};

const main = async () => {
  const customers = await readFile("./data/small_data/customers.csv");
  const parsedCustomers = parseCustomers(customers);
  const report = await Promise.all(parsedCustomers.map(processTransactions));
  const formattedReport = report.join("\n");
  writeToFile(formattedReport);
};

main();
