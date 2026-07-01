import React from "react";
import { PageName } from "../../../components/header/PageName";
import { ClearFormButton } from "../../../components/header/ClearFormButton";
import ImageCropper from "../../../components/image-cropper/ImageCropper";
import { IMAGE_CROP_SETTINGS } from "../../../utils/formUtils";

type HasPic = {
  pic: string | null;
};

type SimpleMasterFormInput<T extends HasPic> = {
    setForm: React.Dispatch<React.SetStateAction<T>>,
    emptyState: T,
    form: T,
    imageCropSettings: IMAGE_CROP_SETTINGS
}

const SimpleMasterForm = <T extends HasPic,>({setForm, emptyState, form, imageCropSettings}: SimpleMasterFormInput<T>) => {
  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        <PageName />
        <span className="flex gap-2">
          <ClearFormButton setForm={setForm} emptyState={emptyState} />
        </span>
      </div>
      <div className="input-block w-full">
        <h2 className="field-header">Card Picture</h2>
        <ImageCropper
          croppedImage={form.pic}
          setCroppedImage={(croppedPic) =>
            setForm((prev: T) => ({
              ...prev,
              pic: croppedPic,
            }))
          }
          cropSettings={imageCropSettings}
        />
      </div>
    </div>
  );
};

export default SimpleMasterForm;
