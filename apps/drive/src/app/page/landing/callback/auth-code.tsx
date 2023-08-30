import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import { Routes } from "../../../routes";

function AuthCodeCallback() {
  const [p] = useSearchParams();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      localStorage.setItem("access_token", p.get("access_token") as string);
      navigate("/drive");
    }
  });

  useEffect(() => {
    mutate();
  }, []);

  return <>loading...</>;
}

export default AuthCodeCallback;
