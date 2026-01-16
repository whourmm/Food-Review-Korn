import Link from "next/link";
import { Plus } from "lucide-react";


export default function PlusButton({text , path} : {text: string, path: string}) {
    return (  <div className="w-fit my-5">
              
              <Link
                href={path}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
              >
                <Plus size={20} />
                {text}
              </Link>
            </div>)
}