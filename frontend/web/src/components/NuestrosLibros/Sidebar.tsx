"use client";

type Category = {
  id: string;
  name: string;
};

type Props = {
  categories: Category[];
  photobookFilters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export default function Sidebar({
  categories,
  photobookFilters,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: Props) {
  return (
    <aside>
      <h2
        style={{
          margin: "0 0 28px 0",
          fontSize: "52px",
          lineHeight: 1,
          fontWeight: 800,
          color: "#4f97cf",
          textTransform: "uppercase",
        }}
      >
        Nuestros Libros
      </h2>

      <div
        style={{
          width: "100%",
          height: "58px",
          border: "2px solid #bdbdbd",
          borderRadius: "18px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          marginBottom: "18px",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: "12px", flexShrink: 0 }}
        >
          <circle cx="11" cy="11" r="7" stroke="#9c9c9c" strokeWidth="2" />
          <path d="M16.5 16.5L21 21" stroke="#9c9c9c" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Busca el libro para ti"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            fontSize: "20px",
            color: "#222",
            background: "transparent",
            width: "100%",
          }}
        />
      </div>

      <div
        style={{
          border: "2px solid #bdbdbd",
          borderRadius: "22px",
          background: "rgba(255,255,255,0.88)",
          padding: "22px 26px 26px",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: 500,
            color: "#222",
            marginBottom: "14px",
            textDecoration: "underline",
            textUnderlineOffset: "6px",
          }}
        >
          Libros Personalizados
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginBottom: "18px",
            color: "#222",
            fontSize: "18px",
          }}
        >
          {categories.map((cat) => (
            <label
              key={cat.id}
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="radio"
                name="bookFilter"
                checked={activeFilter === cat.id}
                onChange={() => onFilterChange(cat.id)}
                style={{ cursor: "pointer" }}
              />
              {cat.name}
            </label>
          ))}
        </div>

        <div
          style={{
            fontSize: "22px",
            fontWeight: 500,
            color: "#222",
            marginBottom: "14px",
          }}
        >
          PhotoBooks
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            color: "#222",
            fontSize: "18px",
          }}
        >
          {photobookFilters.map((filter) => (
            <label
              key={filter}
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <input
                type="radio"
                name="bookFilter"
                checked={activeFilter === `photobook-${filter}`}
                onChange={() => onFilterChange(`photobook-${filter}`)}
                style={{ cursor: "pointer" }}
              />
              {filter}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
