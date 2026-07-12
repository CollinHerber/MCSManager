import { useInstanceInfo } from "@/hooks/useInstance";
import { restartInstance, updateInstanceConfig } from "@/services/apis/instance";
import { reportErrorMsg } from "@/tools/validator";
import { Modal, message } from "ant-design-vue";
import { computed } from "vue";

export function useWindrosePlus(instanceId: string, daemonId: string) {
  const { instanceInfo, isRunning, execute: refreshInstance } = useInstanceInfo({
    instanceId,
    daemonId,
    autoRefresh: true
  });
  const enabled = computed(() =>
    (instanceInfo.value?.config?.docker?.env ?? []).some(
      (value: string) => value.toLowerCase() === "windrose_plus_enabled=true"
    )
  );
  const { execute: saveInstance, isLoading } = updateInstanceConfig();

  const setEnabled = async (nextEnabled: boolean) => {
    const config = instanceInfo.value?.config;
    if (!config) return;
    const env = (config.docker?.env ?? []).filter(
      (value: string) => !value.startsWith("WINDROSE_PLUS_ENABLED=")
    );
    env.push(`WINDROSE_PLUS_ENABLED=${nextEnabled}`);

    try {
      await saveInstance({
        params: { uuid: instanceId, daemonId },
        data: {
          processType: config.processType,
          startCommand: config.startCommand,
          updateCommand: config.updateCommand,
          docker: { env }
        }
      });
      if (isRunning.value) {
        await restartInstance().execute({ params: { uuid: instanceId, daemonId } });
      }
      await refreshInstance({
        params: { uuid: instanceId, daemonId },
        forceRequest: true
      });
      message.success(
        nextEnabled
          ? "Windrose+ enabled. Its files will be installed during startup."
          : "Windrose+ disabled. Existing configuration and mods were preserved."
      );
    } catch (error: any) {
      reportErrorMsg(error?.message ?? error);
      throw error;
    }
  };

  const confirmToggle = () => {
    const installing = !enabled.value;
    Modal.confirm({
      title: installing ? "Install Windrose+?" : "Uninstall Windrose+?",
      content: isRunning.value
        ? "The server will restart to apply this change. Existing worlds are preserved."
        : "This change will be applied the next time the server starts. Existing worlds are preserved.",
      okText: installing ? "Install Windrose+" : "Uninstall Windrose+",
      okType: installing ? "primary" : "danger",
      onOk: () => setEnabled(installing)
    });
  };

  return { enabled, isLoading, instanceInfo, confirmToggle };
}
