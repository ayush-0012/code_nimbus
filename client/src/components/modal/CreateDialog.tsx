import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setContainerId } from "@/redux/feature/container/containerSlice";
import { useNavigate } from "react-router-dom";
import { setLang } from "@/redux/feature/langs/langOptionsSlice";

interface CreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateDialog({ open, onOpenChange }: CreateDialogProps) {
  const [activeTab, setActiveTab] = useState<"languages" | "frameworks">(
    "languages"
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null); //for language/framework
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleCreate = async () => {
    const type = activeTab === "languages" ? "Language" : "Framework";
    console.log("Type:", type);
    console.log("Selected:", selectedOption);
    console.log("File Name:", fileName);

    if (selectedOption) {
      dispatch(setLang(selectedOption));
      sessionStorage.setItem("lang", selectedOption);
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:9000/api/container/${selectedOption}`,
        {
          fileName,
          language: selectedOption,
          userId,
        }
      );

      console.log(response);
      dispatch(setContainerId(response.data.containerId));
      sessionStorage.setItem("containerId", response.data.containerId);
    } catch (error) {
      console.log("error creating workspace", error);
    } finally {
      setLoading(false);
      navigate("/workspace");
    }
  };

  if (loading) {
    return <div>loading...</div>;
  }

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
                    <SelectItem value="javaScript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="typeScript">TypeScript</SelectItem>
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
                    <SelectItem value="reactJs">React</SelectItem>
                    <SelectItem value="nextJs">Next.js</SelectItem>
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
          <Button
            type="submit"
            onClick={handleCreate}
            className="cursor-pointer"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDialog;
