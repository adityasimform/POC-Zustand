import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useStore } from "../stores/store";
import { Plus } from "lucide-react";

interface ProductForm {
  title: string;
  image: string;
  price: string;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: string;
}

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const initialProduct: ProductForm = {
  title: "",
  image: "",
  price: "",
  description: "",
  brand: "",
  model: "",
  color: "",
  category: "",
  discount: "",
};

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose }) => {
  const addProduct = useStore((state) => state.addProduct);
  const [form, setForm] = useState<ProductForm>(initialProduct);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addProduct({
      ...form,
      id: Date.now(),
      price: Number(form.price),
      discount: Number(form.discount),
    });
    setForm(initialProduct);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <button
          className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-red-500 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Title"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            type="number"
            placeholder="Price"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min={0}
          />
          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="Model"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="Color"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="discount"
            value={form.discount}
            onChange={handleChange}
            type="number"
            placeholder="Discount (%)"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min={0}
            max={100}
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded p-2 font-semibold transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export const AddProductButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl z-50 flex items-center justify-center"
        onClick={() => setOpen(true)}
        title="Add Product"
      >
        <Plus className="w-6 h-6" />
      </button>
      <AddProductModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AddProductModal;