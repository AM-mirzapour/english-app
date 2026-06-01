"use client";

import { UseFormRegister, Control, useFieldArray } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import { BookOpen, Plus, Trash2 } from "lucide-react";

interface Step2Props {
  register: UseFormRegister<any>;
  control: Control<any>;
}

export default function Step2Specialties({ register, control }: Step2Props) {
  
  if (!control) return null;

  const {
    fields: subjectFields,
    append: appendSubject,
    remove: removeSubject,
  } = useFieldArray({
    control,
    name: "subjects",
  });

  const {
    fields: langFields,
    append: appendLang,
    remove: removeLang,
  } = useFieldArray({
    control,
    name: "languages_spoken",
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <BookOpen size={20} className="text-blue-600" /> تخصص‌های تدریس
      </h3>

      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
        <label className="block text-sm font-bold text-slate-700 mb-4">
          چه دروسی را تدریس می‌کنید؟
        </label>
        <div className="space-y-3">
          {subjectFields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <InputField
                label=""
                placeholder="مثال: انگلیسی عمومی، آیلتس..."
                {...register(`subjects.${index}.name` as const, { required: true })}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeSubject(index)}
                  className="p-3 text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendSubject({ name: "" })}
            className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800"
          >
            <Plus size={14} /> افزودن موضوع جدید
          </button>
        </div>
      </div>

      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
        <label className="block text-sm font-bold text-slate-700 mb-4">
          زبان‌های مورد تسلط
        </label>
        <div className="space-y-4">
          {langFields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-start">
              <InputField
                label=""
                placeholder="نام زبان"
                {...register(`languages_spoken.${index}.language` as const)}
                className="w-1/2"
              />
              <select
                {...register(`languages_spoken.${index}.level` as const)}
                className="w-1/2 px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none"
              >
                <option value="Beginner">مبتدی</option>
                <option value="Intermediate">متوسط</option>
                <option value="Advanced">پیشرفته</option>
                <option value="Native">زبان مادری</option>
              </select>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeLang(index)}
                  className="p-2.5 mt-0.5 text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendLang({ language: "", level: "Intermediate" })}
            className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800"
          >
            <Plus size={14} /> افزودن زبان جدید
          </button>
        </div>
      </div>
    </div>
  );
}