import "./Wiki.css"

function Wiki() {

  const items = [
    { publishDate: "2025.01.01", title: "React Fundamentals", type: "Blog" },
    { publishDate: "2025.01.02", title: "Git Good With Github", type: "Blog" },
    { publishDate: "2025.01.03", title: "Recommended Reading", type: "Tutorial" },
    { publishDate: "2025.01.04", title: "What Makes A Good Engineer?", type: "Blog" },
    { publishDate: "2025.01.05", title: "December 2024 Monthly Demos", type: "Video" },
    { publishDate: "2025.01.06", title: "The Benefits of Payload", type: "Blog" },
  ];

  const types = [
    { type: "Blog" },
    { type: "Video" },
    { type: "Projects" },
    { type: "Tutorial" },
  ];

  return (
    <>
      <h1> Blue Nucleus / <span className="h1-subpage"> wiki </span> </h1>
      <div className="wiki-container">
        <div className="wiki-nav-container">
          <div className="wiki-content-description">
            <div> FILTER </div>
            <div> CLEAR FILTERS </div>
          </div>
          <ul>
            {types.map((type, idx) => (
              <li key={idx} className="wiki-filter-section-container">
                <input type="checkbox" className="wiki-filter-checkbox" />
                <label> {type.type} </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="wiki-content-container">
          <div className="wiki-content-description">
            <div> DATE </div>
            <div> NAME </div>
            <div> TYPE </div>
          </div>
          <ul>
            {items.map((item, idx) => (
              <li key={idx} className="wiki-list-item-container">
                <div className="publish-date"> {item.publishDate} </div>
                <a href={`/wiki/${item.title}`}> {item.title} </a>
                <div className="type"> {item.type} </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Wiki;
