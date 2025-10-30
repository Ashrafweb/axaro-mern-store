/* eslint-disable react/prop-types */
import { useState } from "react";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await handleSubmit(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      await handleDelete(e);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='p-3'>
      <form onSubmit={onSubmit} className='space-y-3'>
        <input
          type='text'
          className='input-field'
          placeholder='Write category name'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />

        <div className='flex justify-between gap-3'>
          <button 
            type="submit"
            disabled={isSubmitting}
            className='btn-primary flex items-center justify-center gap-2'
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              buttonText
            )}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={onDelete}
              disabled={isDeleting}
              className='btn-danger flex items-center justify-center gap-2'
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Deleting...</span>
                </>
              ) : (
                "Delete"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
