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

type Plants = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
  plants: Plants;
}

type PlantInput ={
  id?: string;
  name: string;
  description?: string;
  category: string;
  stock: number;
  price: number;
  userId: string;
  imageUrl?: string;
}

export default function InventoryTable({ plants }: InventoryTableProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredPlants = plants?.userPlants?.filter(
    (plant:PlantInput) =>
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

        <CreateDialog  />
        </div>
      </div>

      {/* Table - scrollable on mobile */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>Plant ID</TableHead> */}
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlants?.map((plant:PlantInput) => {
              const slugifiedName = plant.name
                .toLowerCase()
                .replace(/\s+/g, "-");
              const slug = `${plant.id}--${slugifiedName}`;
              const plantUrl = `/plants/${slug}`;

              return (
                <TableRow
                  key={plant.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => router.push(plantUrl)}
                >
                  {/* <TableCell className="font-medium">{plant.id}</TableCell> */}
                  <TableCell>{plant.name}</TableCell>
                  <TableCell>{plant.category}</TableCell>
                  <TableCell>{plant.price}</TableCell>
                  <TableCell className="font-bold">{plant.stock}</TableCell>
                  <TableCell
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-end space-x-4">
                      <EditDialog plant={plant} />
                      <DeleteDialog plant={{id:plant.id!}} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
