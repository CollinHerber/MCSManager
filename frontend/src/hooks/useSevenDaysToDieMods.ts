import { openLoadingDialog } from "@/components/fc";
import { compressFile, downloadAddress } from "@/services/apis/fileManager";
import { getFileConfigAddr } from "@/hooks/useFileManager";
import { parseForwardAddress } from "@/tools/protocol";
import { reportErrorMsg } from "@/tools/validator";
import { message } from "ant-design-vue";
import { ref } from "vue";

const MODS_DIRECTORY = "/Mods";
const MODS_ARCHIVE = "7DaysToDie-Mods.zip";

export function useSevenDaysToDieMods(instanceId: string, daemonId: string) {
  const isDownloading = ref(false);

  const downloadModsZip = async () => {
    if (!instanceId || !daemonId || isDownloading.value) return;

    isDownloading.value = true;
    const loadingDialog = await openLoadingDialog(
      "Creating Mods archive",
      "Compressing the server Mods folder for players...",
      "Please wait"
    );

    try {
      const { execute: compress } = compressFile();
      await compress({
        params: {
          uuid: instanceId,
          daemonId
        },
        data: {
          type: 1,
          code: "utf-8",
          source: `/${MODS_ARCHIVE}`,
          targets: [MODS_DIRECTORY]
        }
      });

      const { state: downloadConfig, execute: createDownload } = downloadAddress();
      await createDownload({
        params: {
          file_name: `/${MODS_ARCHIVE}`,
          uuid: instanceId,
          daemonId
        }
      });

      if (!downloadConfig.value) throw new Error("Could not create a download link.");

      const addr = parseForwardAddress(getFileConfigAddr(downloadConfig.value), "http");
      const url = `${addr}/download/${downloadConfig.value.password}/${MODS_ARCHIVE}`;
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = MODS_ARCHIVE;
      anchor.rel = "noopener";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      message.success("The current server Mods folder is ready to download.");
    } catch (error: any) {
      reportErrorMsg(error?.message || "Failed to create the Mods archive.");
    } finally {
      loadingDialog.cancel();
      isDownloading.value = false;
    }
  };

  return {
    isDownloading,
    downloadModsZip
  };
}
