import avatarImg from "../assets/micro.png";

export default function EmployeeAppreciation() {
  return (
    <div
      style={{
        fontFamily: "'Roboto', Arial, sans-serif",
        background: "#f6f8fc",
        color: "#202124",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Roboto:wght@300;400;500;700&display=swap');
      `}</style>

      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          height: 64,
          padding: "0 16px",
          background: "#f6f8fc",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 210 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, #EA4335 0%, #FBBC05 40%, #34A853 70%, #4285F4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              fontFamily: "'Google Sans', sans-serif",
            }}
          >
            M
          </div>
          <span style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 22, color: "#5f6368" }}>
            Mail
          </span>
        </div>

        <div
          style={{
            flex: 1,
            maxWidth: 720,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#eaf1fb",
            borderRadius: 24,
            padding: "0 20px",
            height: 46,
            color: "#5f6368",
            fontSize: 15,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          Search mail
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth={2}>
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={avatarImg}
              alt="Account"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* SIDEBAR */}
        <div style={{ width: 256, flexShrink: 0, padding: "8px 8px 0", overflowY: "auto" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#c2e7ff",
              color: "#001d35",
              border: "none",
              borderRadius: 16,
              padding: "15px 24px 15px 18px",
              fontFamily: "'Google Sans', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              margin: "8px 0 20px 8px",
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 20h9" stroke="#001d35" strokeWidth={2.4} strokeLinecap="round" />
              <path
                d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"
                stroke="#001d35"
                strokeWidth={2.4}
                strokeLinejoin="round"
              />
            </svg>
            Compose
          </button>

          {[
            { label: "Inbox", count: "4", active: true },
            { label: "Starred" },
            { label: "Sent" },
            { label: "Drafts" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "0 20px 0 24px",
                height: 32,
                borderRadius: "0 16px 16px 0",
                fontSize: 14,
                color: item.active ? "#001d35" : "#202124",
                background: item.active ? "#d3e3fd" : "transparent",
                fontWeight: item.active ? 700 : 400,
                cursor: "pointer",
              }}
            >
              {item.label}
              {item.count && (
                <span style={{ marginLeft: "auto", color: item.active ? "#001d35" : "#5f6368" }}>
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* MAIN */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: "16px 0 0 0",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "10px 16px",
              borderBottom: "1px solid #f1f3f4",
              color: "#5f6368",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth={2}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth={2}>
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </div>

          <div style={{ borderBottom: "1px solid #f1f3f4" }}>
            {[
              { from: "Facilities Team", subject: "Office closed Monday for maintenance", time: "Wed" },
              { from: "People & Culture Team", subject: "🎉 Happy Employee Appreciation Day!", time: "9:14 AM", open: true },
              { from: "IT Helpdesk", subject: "Scheduled password reset reminder", time: "Tue" },
              { from: "Payroll", subject: "Your August payslip is available", time: "Mon" },
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: row.open ? "0 16px 0 13px" : "0 16px",
                  height: 40,
                  fontSize: 14,
                  color: row.open ? "#202124" : "#5f6368",
                  fontWeight: row.open ? 700 : 400,
                  borderBottom: "1px solid #f1f3f4",
                  background: row.open ? "#f2f6fc" : "transparent",
                  borderLeft: row.open ? "3px solid #1a73e8" : "none",
                }}
              >
                <span style={{ width: 200, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {row.from}
                </span>
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {row.subject}
                </span>
                <span style={{ flexShrink: 0, fontSize: 12 }}>{row.time}</span>
              </div>
            ))}
          </div>

          {/* OPEN EMAIL */}
          <div style={{ padding: "20px 32px 48px" }}>
            <div style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 22, marginBottom: 18 }}>
              🎉 Happy Employee Appreciation Day!
            </div>

            <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={avatarImg}
                  alt="Sender"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#202124" }}>
                  Microsoft Singapore People & Culture Team
                </div>
                <div style={{ fontSize: 12, color: "#5f6368" }}>Microsoft.com</div>
              </div>
              <div style={{ fontSize: 12, color: "#5f6368", marginLeft: "auto" }}>
                9:14 AM (2 hours ago)
              </div>
            </div>

            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid #f1f3f4",
                maxWidth: 640,
              }}
            >
              <div
                style={{
                  position: "relative",
                  background: "linear-gradient(120deg, #0F766E 0%, #14B8A6 55%, #FDE68A 100%)",
                  padding: "44px 40px 40px",
                  color: "#fff",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", width: 8, height: 16, background: "#FDE68A", top: 18, left: 60, transform: "rotate(20deg)", borderRadius: 3, opacity: 0.85 }} />
                <div style={{ position: "absolute", width: 10, height: 10, borderRadius: "50%", background: "#fff", top: 70, left: 120, opacity: 0.85 }} />
                <div style={{ position: "absolute", width: 8, height: 16, background: "#fff", top: 30, right: 90, transform: "rotate(-15deg)", borderRadius: 3, opacity: 0.85 }} />
                <div style={{ position: "absolute", width: 10, height: 10, borderRadius: "50%", background: "#FDE68A", bottom: 20, right: 60, opacity: 0.85 }} />
                <div style={{ position: "absolute", width: 8, height: 16, background: "#fff", bottom: 40, right: 150, transform: "rotate(35deg)", borderRadius: 3, opacity: 0.85 }} />

                <div style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", opacity: 0.9, marginBottom: 10, position: "relative" }}>
                  Employee Appreciation Day
                </div>
                <div style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 32, fontWeight: 700, lineHeight: 1.15, maxWidth: 420, position: "relative" }}>
                  Today, we celebrate you.
                </div>
                <div style={{ marginTop: 12, fontSize: 14, maxWidth: 380, lineHeight: 1.5, opacity: 0.95, position: "relative" }}>
                  Every project shipped, every problem solved, every teammate helped along the way — thank you for bringing it all year round.
                </div>
              </div>

              <div style={{ padding: "32px 40px 36px", background: "#fff" }}>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#3c4043", marginBottom: 16 }}>Hi Melissa Zurin (employee number- ENG-089765DEVELOPER),</p>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#3c4043", marginBottom: 16 }}>
                  Employee Appreciation Day only comes once a year, but the impact you all make happens every single day.
                  Whether it's the quiet work nobody sees or the big wins we all celebrate together, this company runs on
                  the effort you bring to it — and we don't say thank you nearly often enough.
                  </p>
                  <p>

                  In appreciation with the good work you have contributed we will have an engineering team retreat in France  for 1week from 12th August 2026 to 19th August .Find your flight tickets and hotel tickets attached here.
                </p>
                <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#3c4043", marginBottom: 16 }}>
                  So today: take a longer lunch, skip the non-essential meeting, and know that leadership sees the work
                  that goes into everything you do.
                </p>

                <div style={{ display: "flex", gap: 14, margin: "24px 0" }}>
                  {[
                    { num: "1", lbl: "TEAM WE'RE PROUD OF" },
                    { num: "365", lbl: "DAYS OF SHOWING UP" },
                    { num: "∞", lbl: "THANK YOUS OWED" },
                  ].map((pill) => (
                    <div
                      key={pill.lbl}
                      style={{
                        flex: 1,
                        background: "#f6f8f7",
                        border: "1px solid #edf0ef",
                        borderRadius: 12,
                        padding: 16,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontFamily: "'Google Sans', sans-serif", fontSize: 20, fontWeight: 700, color: "#0F766E" }}>
                        {pill.num}
                      </div>
                      <div style={{ fontSize: 11.5, color: "#5f6368", marginTop: 4, letterSpacing: 0.3 }}>
                        {pill.lbl}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 8, fontSize: 14.5, color: "#3c4043", lineHeight: 1.6 }}>
                  With appreciation,
                  <div style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 700, color: "#202124", marginTop: 2 }}>
                    The People & Culture Team
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 28,
                padding: "12px 16px",
                background: "#FFFBEA",
                border: "1px dashed #EAB308",
                borderRadius: 10,
                fontSize: 12.5,
                color: "#7c5e00",
                lineHeight: 1.5,
                maxWidth: 640,
              }}
            >
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}