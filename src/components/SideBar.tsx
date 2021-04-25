import { HTMLAttributes, useEffect, useState } from "react";
import { GenreResponseProps } from '../interfaces/GenreResponseProps'
import { api } from '../services/api';
import { Button } from "./Button";
import '../styles/sidebar.scss';

interface SideBarProps extends HTMLAttributes<HTMLElement> {
  selectedGenreId: number;
  onChangeGenre: Function
}

export function SideBar({ selectedGenreId, onChangeGenre, ...rest }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return(
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onChangeGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}