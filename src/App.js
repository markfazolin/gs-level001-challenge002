import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
    
  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const str = `${Date.now()}`;
    const response = await api.post('repositories', {
      title: `Repository ${str}`,
      url: `/markfazolin/${str}`,
      techs: ["react", "reactjs", "javascript"]
    });
    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    //const response =
    await api.delete(`repositories/${id}`);
    const repos = repositories.filter(repo => ( repo.id !== id ));
    setRepositories(repos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(
          repo => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
