"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToolWrapper } from "./ToolWrapper";

export function CalorieCalculator() {
    const [foodItems, setFoodItems] = useState([{ name: "", calories: "" }]);
    const [totalCalories, setTotalCalories] = useState(0);

    const addFoodItem = () => {
        setFoodItems([...foodItems, { name: "", calories: "" }]);
    };

    const removeFoodItem = (index: number) => {
        const newItems = foodItems.filter((_, i) => i !== index);
        setFoodItems(newItems.length > 0 ? newItems : [{ name: "", calories: "" }]);
    };

    const updateFoodItem = (index: number, field: "name" | "calories", value: string) => {
        const newItems = [...foodItems];
        newItems[index][field] = value;
        setFoodItems(newItems);
    };

    const calculateTotal = () => {
        const total = foodItems.reduce((sum, item) => {
            const cal = parseFloat(item.calories);
            return sum + (isNaN(cal) ? 0 : cal);
        }, 0);
        setTotalCalories(total);
    };

    return (
        <ToolWrapper
            title="Calorie Calculator"
            description="Track your daily calorie intake from different foods."
        >
            <div className="max-w-2xl mx-auto">
                <div className="space-y-3 mb-6">
                    {foodItems.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Food item"
                                value={item.name}
                                onChange={(e) => updateFoodItem(index, "name", e.target.value)}
                            />
                            <input
                                type="number"
                                className="flex h-12 w-32 rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Calories"
                                value={item.calories}
                                onChange={(e) => updateFoodItem(index, "calories", e.target.value)}
                            />
                            {foodItems.length > 1 && (
                                <button
                                    onClick={() => removeFoodItem(index)}
                                    className="px-4 h-12 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 mb-6">
                    <button
                        onClick={addFoodItem}
                        className="flex-1 h-12 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                        + Add Food Item
                    </button>
                    <Button onClick={calculateTotal} className="flex-1 bg-orange-500 hover:bg-orange-600 h-12">
                        Calculate Total
                    </Button>
                </div>

                {totalCalories > 0 && (
                    <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 text-center">
                        <div className="text-sm text-muted-foreground mb-1">Total Calories</div>
                        <div className="text-5xl font-bold text-white mb-2">
                            {totalCalories.toFixed(0)}
                        </div>
                        <div className="text-sm text-muted-foreground">calories</div>
                    </div>
                )}

                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground">
                    <h4 className="font-semibold text-white mb-2">Common Foods (per 100g):</h4>
                    <div className="grid grid-cols-2 gap-2">
                        <div>Rice: 130 cal</div>
                        <div>Chicken Breast: 165 cal</div>
                        <div>Banana: 89 cal</div>
                        <div>Egg: 155 cal</div>
                        <div>Bread: 265 cal</div>
                        <div>Milk: 42 cal</div>
                    </div>
                </div>
            </div>
        </ToolWrapper>
    );
}
