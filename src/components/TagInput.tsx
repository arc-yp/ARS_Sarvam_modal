import React, { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  placeholder = "Add a service and press Enter",
  className = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null); // where the item would drop

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const addTag = () => {
    if (inputValue.trim()) {
      const newTag = inputValue.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  // Drag & Drop handlers for reordering tags
  const onDragStart = (e: React.DragEvent<HTMLSpanElement>, index: number) => {
    setDragIndex(index);
    // Provide data for some browsers even if we don't use it later
    e.dataTransfer.setData("text/plain", String(index));
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent<HTMLSpanElement>) => {
    // Allow drop
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: React.DragEvent<HTMLSpanElement>, dropIndex: number) => {
    e.preventDefault();
    const fromIndex = dragIndex ?? Number(e.dataTransfer.getData("text/plain"));
    if (isNaN(fromIndex) || fromIndex === dropIndex) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }

    const next = [...tags];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(dropIndex, 0, moved);
    setDragIndex(null);
    setOverIndex(null);
    onChange(next);
  };

  const onDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg bg-white min-h-[42px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
        {tags.map((tag, index) => (
          <>
            {/* Insertion indicator before the hovered chip */}
            {dragIndex !== null && overIndex === index && (
              <span
                key={`indicator-${index}`}
                aria-hidden
                className="w-0.5 h-6 bg-blue-500 rounded self-center"
              />
            )}
            <span
              key={`${tag}-${index}`}
              className={`inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md select-none cursor-grab ${
                dragIndex === index
                  ? "opacity-70 ring-2 ring-blue-300 cursor-grabbing"
                  : ""
              }`}
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={(e) => {
                onDragOver(e);
                setOverIndex(index);
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                setOverIndex(index);
              }}
              onDrop={(e) => onDrop(e, index)}
              onDragEnd={onDragEnd}
            >
              <span className="capitalize">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
                title={`Remove ${tag}`}
                className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </>
        ))}
        {/* End-of-list drop indicator */}
        {dragIndex !== null && overIndex === tags.length && (
          <span
            aria-hidden
            className="w-0.5 h-6 bg-blue-500 rounded self-center"
          />
        )}
        <div className="flex items-center flex-1 min-w-[120px]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onDragOver={(e) => {
              onDragOver(e as unknown as React.DragEvent<HTMLSpanElement>);
              setOverIndex(tags.length);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              setOverIndex(tags.length);
            }}
            onDrop={(e) =>
              onDrop(
                e as unknown as React.DragEvent<HTMLSpanElement>,
                tags.length
              )
            }
            placeholder={tags.length === 0 ? placeholder : "Add another..."}
            className="flex-1 outline-none text-sm bg-transparent"
          />
          {inputValue && (
            <button
              type="button"
              onClick={addTag}
              aria-label="Add service"
              title="Add service"
              className="ml-2 p-1 text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Type to add; drag chips to reorder. Press Enter to add another (e.g.,
        "food quality", "staff", "ambiance").
      </p>
    </div>
  );
};
