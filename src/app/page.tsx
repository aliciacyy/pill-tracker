import { Figtree } from 'next/font/google';

const inter = Figtree({ weight: '400', subsets: ['latin'] });
export default function Home() {
  
  const today = new Date();
  today.setHours(0,0,0,0);
  const date = today.toLocaleDateString('en-UK', { timeZone: 'Asia/Singapore' });
  
  const numRows = 5;
  const numCols = 2;

  const startDate = new Date('2024-02-27');
  startDate.setHours(0,0,0,0);
  // const endDate = new Date('2024-03-06');
  // Calculate the difference in milliseconds
  const differenceInMilliseconds = Math.abs(today.getTime() - startDate.getTime());
  // Convert milliseconds to days
  const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24)) - 1;
  const pillsEaten = (differenceInDays * 3) + 1;
  let pillsRemaining = 10 - (pillsEaten % 10);
  if (pillsEaten <= 10) {
    pillsRemaining = 10 - pillsEaten;
  }

  const generate = () => {
    let tables = [];
    if (pillsRemaining < 3 && pillsRemaining > 0) {
      // need to generate 2 tables
      tables.push(generateRows(pillsRemaining));
      tables.push(generateRowsSecond(3 - pillsRemaining));
      return tables;
    } else if (pillsRemaining === 0) {
      tables.push(generateRows(10));
    } else {
      tables.push(generateRows(pillsRemaining));
    }
    return tables;
  }


  const generateRows = (pillsRemaining: number) => {
    const rows = [];
    for (let i = 1; i <= numRows; i++) {
      const cells = [];
      for (let j = 0; j < numCols; j++) {
        cells.push(
          <td key={j} className="w-8 h-6">
            <div className={`w-6 h-6 m-auto rounded-full ${setCellValue(i, j, 10 - pillsRemaining)}`}></div>
          </td>
        );
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
    return rows;
  };
  
  const generateRowsSecond = (pillsToEat: number) => {
    const rows = [];
    for (let i = 1; i <= numRows; i++) {
      const cells = [];
      for (let j = 0; j < numCols; j++) {
        cells.push(
          <td key={j} className="w-8 h-6">
            <div className={`w-6 h-6 m-auto rounded-full ${setCellValueSecond(i, j, pillsToEat)}`}></div>
          </td>
        );
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
    return rows;
  };
  
  const setCellValue = (row: number, col: number, pillsEaten: number) => {
    let value = row + col;
    if (row > 1) {
      value += row - 1;
    }
    if (value <= pillsEaten) {
      return 'bg-gray-500';
    } else if (value <= pillsEaten + 3) {
      return 'bg-red-500';
    } else {
      return 'bg-blue-500';
    }
  };

  const setCellValueSecond = (row: number, col: number, pillsToEat: number) => {
    let value = row + col;
    if (row > 1) {
      value += row - 1;
    }
    if (value <= pillsToEat) {
      return 'bg-red-500';
    } else {
      return 'bg-blue-500';
    }
  };

  return (
    <main className={`min-h-screen px-8 py-8 text-center ${inter.className}`}>
      <h1 className='text-2xl mb-4 font-bold'>Pill Tracker</h1>
      <h2 className='text-l mb-8'>Today&apos;s date: {date}</h2>
      <div className='flex gap-4 justify-center'>
        {generate().map((table, idx) => (
          <table key={idx}>
            <tbody>{table}</tbody>
          </table>
        ))}
      </div>
      <div>
        <h2 className='text-l mt-8 font-bold'>Stats</h2>
        <p className='text-l'>Total pills eaten: {pillsEaten}</p>
      </div>
    </main>
  );
}
