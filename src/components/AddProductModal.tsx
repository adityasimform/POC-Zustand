import React, { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useStore } from "../stores/store";
import { Plus, X } from "lucide-react";

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
  id?: number;
}

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: ProductForm | null;
  mode?: "add" | "edit";
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

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  initialData,
  mode = "add",
}) => {
  const addProduct = useStore((state) => state.addProduct);
  const updateProduct = useStore((state) => state.updateProduct);
  const [form, setForm] = useState<ProductForm>(initialProduct);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(initialProduct);
    }
  }, [initialData, open]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "edit" && form.id !== undefined) {
      updateProduct({
        ...form,
        price: Number(form.price),
        discount: Number(form.discount),
        id: form.id,
      });
    } else {
      addProduct({
        ...form,
        id: Date.now(),
        price: Number(form.price),
        discount: Number(form.discount),
      });
    }
    setForm(initialProduct);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-0 rounded-3xl shadow-2xl border border-indigo-100 dark:border-gray-700 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">
            {mode === "edit" ? "Edit Product" : "Add Product"}
          </h2>
          <button
            className="text-gray-400 hover:text-red-500 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
              Title
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Product Title"
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </label>
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
              Brand
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </label>
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
              Model
              <input
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder="Model"
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </label>
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
              Color
              <input
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="Color"
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </label>
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
              Category
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
              Price
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                type="number"
                min={0}
                placeholder="Price"
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </label>
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
              Discount (%)
              <input
                name="discount"
                value={form.discount}
                onChange={handleChange}
                type="number"
                min={0}
                max={100}
                placeholder="Discount"
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </label>
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
              Image URL
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </label>
            <label className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
              />
            </label>
          </div>
          <div className="md:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-bold px-6 py-2 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <Plus className="w-5 h-5" />
              {mode === "edit" ? "Save Changes" : "Add Product"}
            </button>
          </div>
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