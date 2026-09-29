import { BriefcaseBusiness, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getPublicMembers } from "../../services/memberService";

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublicMembers();
        setMembers(response.members || []);
      } catch (err) {
        setError(err.message || "Unable to load members.");
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  return (
    <main className="min-h-[60vh] bg-[#fdfcf7] text-[#123524]">
      {/* Hero */}
      <section className="border-b border-[#e4e2d8] bg-[#eaf3ec]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2f6b3f]">
            Sevoday Foundation
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Our Members
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Meet the people who are part of the Sevoday Foundation community
            and contribute towards meaningful social change.
          </p>
        </div>
      </section>

      {/* Members */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
        {loading && (
          <div className="py-16 text-center text-sm text-slate-500">
            Loading members...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-12 text-center text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && members.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#cbd8cc] bg-white px-5 py-16 text-center">
            <Users
              className="mx-auto h-10 w-10 text-[#2f6b3f]"
              strokeWidth={1.7}
            />

            <h2 className="mt-4 text-xl font-semibold text-[#123524]">
              No members to display yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Approved members of Sevoday Foundation will appear here.
            </p>
          </div>
        )}

        {!loading && !error && members.length > 0 && (
          <>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">
                  Our growing community
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#123524]">
                  Foundation Members
                </h2>
              </div>

              <div className="hidden items-center gap-2 rounded-full bg-[#eaf3ec] px-4 py-2 text-sm font-semibold text-[#2f6b3f] sm:flex">
                <Users size={16} />
                {members.length}{" "}
                {members.length === 1 ? "Member" : "Members"}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => {
                const initials = member.fullName
                  ? member.fullName
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")
                      .toUpperCase()
                  : "M";

                return (
                  <article
                    key={member._id}
                    className="group overflow-hidden rounded-2xl border border-[#e4e2d8] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex justify-center bg-[#eaf3ec] px-6 pt-7">
                      {member.profilePhoto ? (
                        <img
                          src={member.profilePhoto}
                          alt={member.fullName}
                          className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                        />
                      ) : (
                        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[#2f6b3f] text-2xl font-bold text-white shadow-md">
                          {initials}
                        </div>
                      )}
                    </div>

                    <div className="p-6 text-center">
                      <h3 className="text-lg font-bold text-[#123524]">
                        {member.fullName}
                      </h3>

                      {member.requestedDesignation && (
                        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#fff4cc] px-3 py-1 text-xs font-semibold text-[#8a6500]">
                          <BriefcaseBusiness size={13} />
                          {member.requestedDesignation}
                        </div>
                      )}

                      {member.occupation && (
                        <p className="mt-4 text-sm text-slate-500">
                          {member.occupation}
                        </p>
                      )}

                      {(member.city || member.state) && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
                          <MapPin
                            size={15}
                            className="shrink-0 text-[#2f6b3f]"
                          />

                          <span>
                            {[member.city, member.state]
                              .filter(Boolean)
                              .join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}