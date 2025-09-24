"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { useState } from "react";
import { getPlants } from "@/actions/plant.action";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDiaglog";
import type { Plants } from "@prisma/client"; // ✅ match your schema

type PlantsResult = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
  plants: PlantsResult;
}

export default function InventoryTable({ plants }: InventoryTableProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredPlants = plants?.userPlants?.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.category === selectedCategory)
  );

  if (!plants) {
    return (
      <div className="w-full space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 py-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: 6 }).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="w-full h-4" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="w-full h-4" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-col sm:flex-col items-center gap-2 py-4">
        <div className="relative w-full ">
          <Input
            type="text"
            placeholder="Search plants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
        </div>

        <div className="flex w-full justify-between gap-2">
          <Combobox
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val)}
          />

          <CreateDialog />
        </div>
      </div>

      {/* Table - scrollable on mobile */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredPlants?.map((plant: Plants) => {
    const slugifiedName = plant.name.toLowerCase().replace(/\s+/g, "-");
    const slug = `${plant.id}--${slugifiedName}`;
    const plantUrl = `/plants/${slug}`;

    return (
        <div
          key={plant.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition"
          onClick={() => router.push(plantUrl)}
        >
          {/* Plant Image */}
          <div className="h-40 w-full bg-green-100 rounded-lg flex items-center justify-center mb-4">
            {plant.imageUrl ? (
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-green-900 font-semibold text-lg">
                No Image
              </span>
            )}
          </div>

          {/* Plant Info */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-green-700 dark:text-green-400">
              {plant.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Category: {plant.category}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Price: ${plant.price.toFixed(2)}
            </p>
            <p className="text-sm font-semibold text-green-600">
              Stock: {plant.stock}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-between gap-2" onClick={(e) => e.stopPropagation()}>
            <EditDialog plant={plant} />
            <DeleteDialog plant={{ id: plant.id }} />
          </div>
        </div>
      );
    })}
  </div>

      </div>
    </div>
  );
}
