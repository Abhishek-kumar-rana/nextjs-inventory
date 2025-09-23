"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Search } from "lucide-react";  // ✅ fixed
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

interface Plant {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
}

export default function InventoryTable({ plants }: InventoryTableProps) { // ✅ fixed name
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // if(plants?.userPlants?.length === 0) {
  //   return <div className=" text-center font-bold text-lg mt-10 ">No plants available. Please add some plants.</div>
  // }
const filteredPlants = plants?.userPlants?.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.category === selectedCategory)
  );

  // if(filteredPlants?.length === 0) {
  //   return <div className=" text-center font-bold text-lg mt-10 ">No plants found.</div>
  // }
  
  const router=useRouter();

  if (!plants) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 py-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="w-full h-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="w-full h-4" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }


  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-2 py-4">
          <div className="relative max-w-sm w-full"> {/* ✅ fixed */}
            <Input
              type="text"
              placeholder="Search plants..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute h-4 w-3 left-3 top-1/2 -translate-y-1/2 transform" />
          </div>
          <Combobox
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val)}
          />
           <CreateDialog />
          
        </div>

      



      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPlants?.map((plant) => {
             const slugifiedName = plant.name.toLowerCase().replace(/\s+/g, "-");
            const slug = `${plant.id}--${slugifiedName}`;
            const plantUrl = `/plants/${slug}`;
            return(
            <TableRow key={plant.id} onClick={()=> router.push(plantUrl)} >
              <TableCell className="font-medium">{plant.id}</TableCell>
              <TableCell>{plant.name}</TableCell>
              <TableCell>{plant.category}</TableCell>
              <TableCell>{plant.price}</TableCell>
              <TableCell className="font-bold">{plant.stock}</TableCell>
              <TableCell className="text-right">
                <div className=" flex justify-end space-x-4" onClick={e=> e.stopPropagation()}>
                  <EditDialog plant={plant} />
                  {/* <h1 className=" border rounded-sm bg-red-800 px-2">Delete</h1> */}
                  <DeleteDialog plant={plant} />
                </div>
              </TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
      </div>
    </>
  );
}
