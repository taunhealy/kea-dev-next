import { forwardRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

interface TabProps {
  id: string;
  name: string;
  hasData: boolean;
}

interface TabNavigationProps {
  tabs: readonly TabProps[];
  activeTab: string;
  clickedTab: string | null;
  getTabBorderColor: (tabId: string) => string;
  scrollToSection: (tabId: string) => void;
}

const TabNavigation = forwardRef<HTMLDivElement, TabNavigationProps>(
  (
    { tabs, activeTab, clickedTab, getTabBorderColor, scrollToSection },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm py-4 border-b border-white/10"
      >
        <div className="grid grid-cols-3 md:flex md:flex-wrap justify-center gap-2 bg-black/80 border border-white/20 p-2 rounded-xl md:rounded-full max-w-3xl mx-auto md:scale-100 transform-origin-center">
          {tabs.map((tab) => (
            <TooltipProvider key={tab.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => tab.hasData && scrollToSection(tab.id)}
                    className={`font-primary text-xs md:text-sm rounded-full transition-all py-1.5 md:py-2 px-3 md:px-4 border-2
                      ${
                        tab.hasData
                          ? activeTab === tab.id
                            ? "text-white bg-transparent"
                            : "text-white/60 hover:bg-white/10 active:bg-white/5 border-transparent bg-transparent"
                          : "text-white/30 cursor-not-allowed border-transparent bg-transparent"
                      }`}
                    style={{
                      borderColor:
                        activeTab === tab.id && tab.hasData
                          ? getTabBorderColor(tab.id)
                          : "transparent",
                      boxShadow:
                        activeTab === tab.id && tab.hasData
                          ? `0 0 10px rgba(${getTabBorderColor(tab.id).replace(
                              /[^\d,]/g,
                              ""
                            )}, 0.3)`
                          : "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    {tab.name}
                  </button>
                </TooltipTrigger>
                {!tab.hasData && (
                  <TooltipContent>
                    <p className="font-primary text-sm">
                      No {tab.name.toLowerCase()} information available
                    </p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    );
  }
);

TabNavigation.displayName = "TabNavigation";

export default TabNavigation;
