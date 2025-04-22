"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
    recipeId: string;
}

export default function FavoriteButton({ recipeId }: FavoriteButtonProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    // Vérifie si la recette est déjà en favoris au chargement
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorite(favorites.includes(recipeId));
    }, [recipeId]);

    // Fonction pour gérer l'ajout/retrait des favoris
    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        if (favorites.includes(recipeId)) {
            // Retirer des favoris
            const updatedFavorites = favorites.filter((favId: string) => favId !== recipeId);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            // Ajouter aux favoris
            favorites.push(recipeId);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(true);
        }
    };

    return (
        <button onClick={toggleFavorite}>
            <Heart color={isFavorite ? "red" : "black"} />
            {isFavorite ? "Retirer des Favoris" : "Favori"}
        </button>
    );
}