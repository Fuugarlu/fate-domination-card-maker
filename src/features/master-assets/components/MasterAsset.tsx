import { IMAGE_CROP_SETTINGS } from '@/src/utils/formUtils';
import { MasterPicAndColorForm } from '../types/formTypes';

type props = {
    form: MasterPicAndColorForm
    isPreview: boolean
    assetType: IMAGE_CROP_SETTINGS
}

const standeeAssetSettings = {
  width: 876,
  height: 1433,
  border: "50px",
  borderRadius: ""
}

const tokenAssetSettings = {
  width: 876,
  height: 876,
  border: "40px",
  borderRadius: "9999px"
}

export const MasterAsset = ({form, isPreview, assetType}: props) => {
  const assetSettings = assetType == IMAGE_CROP_SETTINGS.STANDEE ? standeeAssetSettings : tokenAssetSettings;

  return (
    <div
      style={isPreview ? { zoom: 0.5 } : {}}
      className={`
        ${!isPreview ? "absolute left-[-9999px] top-[-9999px]" : "flex flex-col items-center"}
      `}
    >
      <div>
        <div
          id={isPreview ? "card-preview" : assetType + "-to-save"}
          className={`relative overflow-hidden`}
          style={{
            width: assetSettings.width,
            height: assetSettings.height,
          }}
        >
          {/* Character image */}
          {form.pic && (
            <img
              src={form.pic}
              alt=""
              className={`absolute object-cover`}
              style={{
                width: assetSettings.width,
                height: assetSettings.height,
                border: `${assetSettings.border} solid ${form.borderColor}`,
                borderRadius: `${assetSettings.borderRadius}`
              }}
            />
          )}

        </div>
        <div className="flex justify-center">
          <div className="text-2xl italic mt-3">
            Previewed at 50% zoom.
          </div>
        </div>
      </div>
    </div>
  );
};
