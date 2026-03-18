"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { getBadgeColorPriority, getBadgeColorStatus } from "@/hooks/useBadge";
import { Save } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { PriorityArray, StatusArray } from "@/Constants/PriorityStatus";
import { Priority, Status } from "@/generated/prisma";
import { Issue } from "@/app/Dashboard/types";
import { updateIssueSchema } from "@/lib/validations/issues";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [issue, setIssue] = useState<Issue | null>(null);
  const router = useRouter();
  const priorityRef = useRef<HTMLDetailsElement>(null);
  const statusRef = useRef<HTMLDetailsElement>(null);

  interface EditIssue {
    Title?: string;
    Issue?: string;
    Priority?: Priority | string;
    Status?: Status | string;
  }

  const { register, handleSubmit, setValue, watch, formState } = useForm({
    defaultValues: {
      Title: issue?.Title,
      Issue: issue?.Issue,
      Priority: issue?.Priority.toString(),
      Status: issue?.Status.toString(),
    },
  });

  const dropdownValues = {
    Status: watch("Status", formState.defaultValues?.Status),
    Priority: watch("Priority", formState.defaultValues?.Priority),
  };

  const fetchIssues = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/issues/${id}`);
      const fetched = data.data.issue;
      setIssue(fetched);
      setValue("Title", fetched.Title);
      setValue("Issue", fetched.Issue);
      setValue("Priority", fetched.Priority.toString());
      setValue("Status", fetched.Status.toString());
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          notFound();
        }
      }
    }
  }, [id, setValue]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const onSubmit = async (data: EditIssue) => {
    try {
      const validation = updateIssueSchema.safeParse(data);
      if (!validation.success) {
        console.error("Invalid Data to update Issue");
        throw new Error("Invalid Data to update Issue")
      }

      await axios.patch(`/api/issues/${id}`, {
        ...data,
      });
      router.push("/Issues");
    } catch (error) {
      console.error(error);
    }
  };

  if (issue && !loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-sky-900/20 via-black to-gray-900/20">
        <dialog
          id={`Edit-Modal-${issue.id.toString()}`}
          className={`modal ${!loading ? "modal-open" : ""} md:scale-125`}
          title="Issue to Edit"
        >
          <div className="modal-box p-2 pt-5 bg-gray-900 !overflow-visible">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => router.push("/Issues")}
              >
                ✕
              </button>
            </form>
            <form
              className="bg-gray-900 p-3 w-full text-white rounded"
              onSubmit={handleSubmit(onSubmit)}
              name="Issue Editor"
            >
              <input
                required
                type="text"
                className="text-xl font-bold text-blue-400 mb-2 w-full focus:p-1 break-words"
                placeholder={issue.Title}
                {...register("Title")}
                contentEditable="plaintext-only"
              />
              <p className="text-gray-500 my-1">Describtion:</p>
              <textarea
                required
                className="my-1 bg-black p-2 rounded w-full min-h-10 max-h-60"
                placeholder={issue.Issue}
                {...register("Issue")}
              />
              <div className="grid grid-cols-4 space-x-7 items-center">
                <div className="col-span-1 flex">
                  <details
                    className="dropdown"
                    ref={priorityRef}
                    onClick={() => {
                      if (statusRef.current) statusRef.current.open = false;
                    }}
                  >
                    <summary
                      className={`badge badge-soft hover:bg-base-300 cursor-pointer ${getBadgeColorPriority(
                        dropdownValues.Priority || issue.Priority,
                      )} m-2`}
                    >
                      {dropdownValues.Priority || issue.Priority}
                    </summary>
                    <ul
                      className={`menu dropdown-content bg-base-100 rounded-box z-[9999] w-28 p-2 mb-2 shadow-sm`}
                    >
                      {PriorityArray.map((priority) => (
                        <li
                          className="cursor-pointer hover:bg-gray-800 p-1 rounded"
                          onClick={() => {
                            setValue("Priority", priority);
                            if (priorityRef.current)
                              priorityRef.current.open = false;
                          }}
                          key={priority}
                        >
                          {priority}
                        </li>
                      ))}
                    </ul>
                  </details>
                  <details
                    className="dropdown"
                    ref={statusRef}
                    onClick={() => {
                      if (priorityRef.current) priorityRef.current.open = false;
                    }}
                  >
                    <summary
                      className={`badge badge-soft hover:bg-base-300 cursor-pointer ${getBadgeColorStatus(
                        dropdownValues?.Status || issue?.Status,
                      )} m-2`}
                    >
                      {dropdownValues.Status?.replace("_","") || issue?.Status.replace("_","")}
                    </summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[9999] w-28 p-2 mb-2 shadow-sm">
                      {StatusArray.map((status) => (
                        <li
                          className="cursor-pointer hover:bg-gray-600 p-1 rounded"
                          onClick={() => {
                            setValue("Status", status);
                            if (statusRef.current)
                              statusRef.current.open = false;
                          }}
                          key={status}
                        >
                          {status.replace("_","")}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
                <button
                  className="col-span-3 justify-self-end hover:scale-105 hover:shadow-2xl"
                  type="submit"
                >
                  <Save />
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-sky-900/20 via-black to-gray-900/20 relative">
        <div className="rounded-xl absolute w-[75vw] h-[25vh] md:h-[40vh] left-1/2 top-1/2 -translate-1/2 bg-gray-700 animate-pulse"></div>
      </section>
    );
  }
};

export default Page;
