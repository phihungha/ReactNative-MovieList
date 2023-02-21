export interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  companies?: string[];
}

export async function getMovie(id: string): Promise<Movie | null> {
  switch (id) {
    case '1':
      return {
        id: '1',
        title: 'Interstellar',
        releaseYear: 2014,
        companies: ['Warner Bros. Pictures', 'Legendary Entertainment'],
      };
    case '2':
      return {
        id: '2',
        title: 'Dune',
        releaseYear: 2021,
        companies: ['Warner Bros. Pictures', 'Legendary Entertainment'],
      };
    case '3':
      return {
        id: '3',
        title: 'Turning Red',
        releaseYear: 2022,
        companies: ['Walt Disney Pictures', 'Pixar Animation Studios'],
      };
    default:
      return null;
  }
}

export async function getMovies(): Promise<Movie[]> {
  return [
    {
      id: '1',
      title: 'Interstellar',
      releaseYear: 2014,
    },
    {
      id: '2',
      title: 'Dune',
      releaseYear: 2021,
    },
    {
      id: '3',
      title: 'Turning Red',
      releaseYear: 2022,
    },
    {
      id: '4',
      title: 'A Silent Voice',
      releaseYear: 2016,
    },
  ];
}
