"use client";
// components/DownloadPDFButton.tsx
import React from "react";
import { jsPDF } from "jspdf";
import { Download } from "lucide-react";

interface DownloadPDFButtonProps {
    recipe: any; // Vous pouvez remplacer `any` par un type plus précis si vous avez défini un type pour `recipe`.
}

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({ recipe }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Titre de la recette
        doc.setFontSize(20);
        doc.text(recipe.title, 10, 10);

        // Catégorie et durée
        doc.setFontSize(12);
        doc.text(`Catégorie: ${recipe.category.name}`, 10, 20);
        doc.text(`Durée: ${recipe.duration} min`, 10, 30);

        // Instructions
        doc.setFontSize(16);
        doc.text("Instructions:", 10, 40);
        doc.setFontSize(12);
        doc.text(recipe.instruction, 10, 50, { maxWidth: 190 });

        // Ingrédients
        doc.setFontSize(16);
        doc.text("Ingrédients:", 10, 80);
        recipe.compositions.forEach((composition: any, index: number) => {
            doc.setFontSize(12);
            doc.text(
                `${index + 1}. ${composition.ingredient.name} - ${composition.quantity} ${composition.unit}`,
                10,
                90 + index * 10
            );
        });

        // Sauvegarder le fichier PDF
        doc.save(`${recipe.title}.pdf`);
    };

    return (
        <button onClick={generatePDF} className="download-pdf-btn">
            <Download /> Télécharger
        </button>
    );
};

export default DownloadPDFButton;