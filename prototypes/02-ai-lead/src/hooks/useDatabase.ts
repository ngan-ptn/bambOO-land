import { useState, useEffect } from 'react';
import { initializeDatabase } from '../db';

export function useDatabase() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initializeDatabase()
      .then(() => setIsLoading(false))
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { isLoading, error };
}
