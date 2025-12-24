"use client";

import { use, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { notFound, useRouter } from "next/navigation";
import { getBadgeColorPriority, getBadgeColorStatus } from "@/hooks/useBadge";
import { Edit } from "lucide-react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const issue = useSelector((state: RootState) =>
    state.issueState.issues.find((issue) => issue.id.toString() === id)
  );
  const router = useRouter();

  useEffect(() => {
    if (!issue) {
      notFound();
    }

    (
      document.getElementById(`Edit-Modal-${issue.id}`) as HTMLDialogElement
    ).show();
    console.log(id);
    return;
  }, [id, issue]);

  if (!issue || !issue.id) {
    return notFound();
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-900/20 via-black to-gray-900/20">
      <dialog id={`Edit-Modal-${issue.id}`} className="modal">
        <div className="modal-box p-0">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => router.push("/Issues")}
            >
              ✕
            </button>
          </form>
          <div className="bg-gray-900 max-h-52 p-3 w-full text-white col-span-12 md:col-span-6 rounded">
            <p className="text-xl font-bold text-blue-400 mb-2">
              {issue.Title}
            </p>
            <p className="text-gray-500 my-1">Describtion:</p>
            <p className="my-1 bg-black p-2 rounded">{issue?.Issue}</p>
            <div className="grid grid-cols-4 space-x-7 items-center">
              <div className="col-span-1 flex">
                <span
                  className={`badge ${getBadgeColorPriority(
                    issue.Priority
                  )} m-2`}
                >
                  {issue?.Priority}
                </span>
                <span
                  className={`badge badge-soft ${getBadgeColorStatus(
                    issue?.Status
                  )} m-2`}
                >
                  {issue?.Status}
                </span>
              </div>
              <div
                className="col-span-3 justify-self-end hover:scale-105 hover:shadow-2xl"
                onClick={() => router.push(`Issues/edit/${issue.id}`)}
              >
                <Edit />
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default Page;
