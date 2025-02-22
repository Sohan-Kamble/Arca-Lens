// "use client";

// import { useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Download, SortAsc, SortDesc } from 'lucide-react';
// import { Button } from './ui/button';

// interface DataTableProps {
//   data: any[];
//   columns: string[];
//   onFilter: (filters: any) => void;
// }

// export function DataTable({ data, columns, onFilter }: DataTableProps) {
//   const [sortConfig, setSortConfig] = useState<{
//     key: string | null;
//     direction: 'asc' | 'desc';
//   }>({ key: null, direction: 'asc' });
//   const [filters, setFilters] = useState<Record<string, string>>({});

//   const handleSort = (key: string) => {
//     setSortConfig({
//       key,
//       direction:
//         sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
//     });
//   };

//   const sortedData = [...data].sort((a, b) => {
//     if (!sortConfig.key) return 0;
    
//     const aValue = a[sortConfig.key];
//     const bValue = b[sortConfig.key];
    
//     if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//     if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//     return 0;
//   });

//   const handleFilterChange = (column: string, value: string) => {
//     const newFilters = { ...filters, [column]: value };
//     setFilters(newFilters);
//     onFilter(newFilters);
//   };

//   const handleExport = () => {
//     const csv = [
//       columns.join(','),
//       ...sortedData.map(row => columns.map(col => JSON.stringify(row[col])).join(','))
//     ].join('\n');
    
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'export.csv';
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   return (
//     <Card className="w-full">
//       <div className="p-4 space-y-4">
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-bold">Table Data</h2>
//           <Button onClick={handleExport} className="gap-2">
//             <Download className="h-4 w-4" />
//             Export CSV
//           </Button>
//         </div>
        
//         <div className="grid grid-cols-4 gap-4">
//           {columns.slice(0, 4).map((column) => (
//             <Input
//               key={column}
//               placeholder={`Filter by ${column}`}
//               value={filters[column] || ''}
//               onChange={(e) => handleFilterChange(column, e.target.value)}
//               className="w-full"
//             />
//           ))}
//         </div>

//         <ScrollArea className="h-[calc(100vh-15rem)] w-full">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableHead
//                     key={column}
//                     className="cursor-pointer"
//                     onClick={() => handleSort(column)}
//                   >
//                     <div className="flex items-center gap-2">
//                       {column}
//                       {sortConfig.key === column && (
//                         sortConfig.direction === 'asc' ? 
//                           <SortAsc className="h-4 w-4" /> : 
//                           <SortDesc className="h-4 w-4" />
//                       )}
//                     </div>
//                   </TableHead>
//                 ))}
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {sortedData.map((row, i) => (
//                 <TableRow key={i}>
//                   {columns.map((column) => (
//                     <TableCell key={column}>{row[column]}</TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </ScrollArea>
//       </div>
//     </Card>
//   );
// }

"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, SortAsc, SortDesc } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress";

interface DataTableProps {
  tableName: string;
  data: any[];
  columns: string[];
  onFilter: (filters: any) => void;
}

export function DataTable({ tableName, data, columns, onFilter }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [dynamicFilters, setDynamicFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleFilterChange = (column: string, value: string) => {
    const newFilters = { ...filters, [column]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleExport = () => {
    const csv = [
      columns.join(","),
      ...sortedData.map((row) =>
        columns.map((col) => JSON.stringify(row[col])).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleColumnTripleClick = (column: string) => {
    if (!dynamicFilters.includes(column)) {
      setDynamicFilters((prev) => [column, ...prev].slice(0, 4));
    }
  };

  return (
    <Card className="w-full">
      <div className="p-4 space-y-4">
        {/* Table Name */}
        <h1 className="text-3xl font-bold">{tableName}</h1>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Filters</h2>
          <Button onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Loading Bar */}
        {loading && <Progress value={70} className="h-2" />}

        {/* Filter Section */}
        <div className="sticky top-0 bg-white z-10 p-2 border-b">
          <div className="flex gap-2 overflow-x-auto">
            {/* Default Filters */}
            {columns.slice(0, 4).map((column) => (
              <Input
                key={column}
                placeholder={`Filter by ${column}`}
                value={filters[column] || ""}
                onChange={(e) => handleFilterChange(column, e.target.value)}
                className="w-40"
              />
            ))}

            {/* Dynamically Added Filters */}
            {dynamicFilters.map((column) => (
              <Input
                key={column}
                placeholder={`Filter by ${column}`}
                value={filters[column] || ""}
                onChange={(e) => handleFilterChange(column, e.target.value)}
                className="w-40"
              />
            ))}
          </div>
        </div>

        {/* Table */}
        <ScrollArea className="h-[calc(100vh-15rem)] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column}
                    className="cursor-pointer"
                    onClick={() => handleSort(column)}
                    onDoubleClick={() => handleColumnTripleClick(column)} // Triple-click to add filter
                  >
                    <div className="flex items-center gap-2">
                      {column}
                      {sortConfig.key === column &&
                        (sortConfig.direction === "asc" ? (
                          <SortAsc className="h-4 w-4" />
                        ) : (
                          <SortDesc className="h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((row, i) => (
                <TableRow
                  key={i}
                  className="hover:bg-gray-200 cursor-pointer"
                  onClick={() => console.log(`Row clicked:`, row)}
                >
                  {columns.map((column) => (
                    <TableCell key={column}>{row[column]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </Card>
  );
}
