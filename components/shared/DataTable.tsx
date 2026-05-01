"use client";
// components/shared/DataTable.tsx
import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  cell?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string }>({
  data, columns, loading = false, searchable = false,
  searchPlaceholder = "Search...", pageSize = 20,
  emptyMessage = "No records found.", onRowClick,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = searchable && search
    ? data.filter((row) =>
        Object.values(row as Record<string, unknown>).some((v) =>
          String(v ?? "").toLowerCase().includes(search.toLowerCase())
        )
      )
    : data;

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="datatable-search"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 h-9"
          />
        </div>
      )}

      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {columns.map((col) => (
                <TableHead key={String(col.key)} className={cn("text-xs font-semibold uppercase tracking-wide text-muted-foreground py-3", col.className)}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}><Skeleton className="h-4 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-12 text-muted-foreground text-sm">{emptyMessage}</TableCell>
              </TableRow>
            ) : (
              paginated.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={cn("transition-colors", onRowClick && "cursor-pointer hover:bg-accent/50")}
                >
                  {columns.map((col) => (
                    <TableCell key={String(col.key)} className={cn("py-3 text-sm", col.className)}>
                      {col.cell ? col.cell(row) : String((row as Record<string, unknown>)[String(col.key)] ?? "—")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>Showing {((currentPage - 1) * pageSize) + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}</p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={currentPage === 1} onClick={() => setPage(1)}><ChevronsLeft size={14} /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={currentPage === 1} onClick={() => setPage((p) => p - 1)}><ChevronLeft size={14} /></Button>
            <span className="px-2 font-medium text-foreground">{currentPage} / {totalPages}</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={currentPage === totalPages} onClick={() => setPage((p) => p + 1)}><ChevronRight size={14} /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={currentPage === totalPages} onClick={() => setPage(totalPages)}><ChevronsRight size={14} /></Button>
          </div>
        </div>
      )}
    </div>
  );
}
