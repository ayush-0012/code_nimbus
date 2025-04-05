import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface CreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateDialog({ open, onOpenChange }: CreateDialogProps) {
  const [activeTab, setActiveTab] = useState<"languages" | "frameworks">(
    "languages"
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleSave = () => {
    const type = activeTab === "languages" ? "Language" : "Framework";
    console.log("Type:", type);
    console.log("Selected:", selectedOption);
    console.log("File Name:", fileName);

    // You'll use type, selectedOption, and fileName for an API call later
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Choose a category and give your file a name to start.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="languages"
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "languages" | "frameworks")
          }
          className="w-full mt-4"
        >
          {/* Tabs List */}
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="languages" className="cursor-pointer">
              Programming Languages
            </TabsTrigger>
            <TabsTrigger value="frameworks" className="cursor-pointer">
              Frameworks
            </TabsTrigger>
          </TabsList>

          {/* TabsContent wraps around shared UI below */}
          <TabsContent value="languages">
            {/* File Name Input */}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fileName" className="text-right">
                  File Name
                </Label>
                <Input
                  id="fileName"
                  className="col-span-3"
                  placeholder="e.g. xyz"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>

              {/* Language Dropdown */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Language</Label>
                <Select onValueChange={(value) => setSelectedOption(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="c++">C++</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="frameworks">
            {/* File Name Input */}
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fileName" className="text-right">
                  File Name
                </Label>
                <Input
                  id="fileName"
                  className="col-span-3"
                  placeholder="e.g. xyz"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>

              {/* Framework Dropdown */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Framework</Label>
                <Select onValueChange={(value) => setSelectedOption(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="nextjs">Next.js</SelectItem>
                    <SelectItem value="vue">Vue.js</SelectItem>
                    <SelectItem value="angular">Angular</SelectItem>
                    <SelectItem value="django">Django</SelectItem>
                    <SelectItem value="flask">Flask</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDialog;
