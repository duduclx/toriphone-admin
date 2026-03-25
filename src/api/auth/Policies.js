import { useState } from "react";

export const usePolicies = ({ apiClient }) => {

  // values
  const [policiesAll, setPoliciesAll] = useState({});
  const [policies, setPolicies] = useState({});
  const [policySelected, setPolicySelected] = useState({});

  // functions
  const policiesGet = async () => {
    const res = await apiClient.client.get("auth/0.1/policies?recurse=false");
    setPoliciesAll(res);
    return res;
  };

  const policiesPageGet = async (search = null, offset = 0, limit = 10) => {
    if(search) {
      const res = await apiClient.client.get(`auth/0.1/policies?recurse=false&limit=${limit}&offset=${offset}&search=${search}`);
      setPolicies(res);
      return res;
    } else {
      const res = await apiClient.client.get(`auth/0.1/policies?recurse=false&limit=${limit}&offset=${offset}`);
      setPolicies(res);
      return res;
    }
  }

  const policyGet = async (policy) => {
    const policyUuid = policy.uuid;
    const res = await apiClient.client.get(`auth/0.1/policies/${policyUuid}`);
    return res;
  };

  const policyAdd = async (policy) => {
    try {
      const res = await apiClient.client.post(`auth/0.1/policies`, policy);
      return res
    } catch (e) {
      return e
    }
  };

  const policyEdit = async (policy) => {
    const policyUuid = policy.uuid;
    try {
      const res = await apiClient.client.put(`auth/0.1/policies/${policyUuid}`, policy);
      return res
    } catch (e) {
      return e
    }
  };

  const policyDelete = async (policy) => {
    const policyUuid = policy.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/policies/${policyUuid}`);
      return res;
    } catch (e) {
      return false;
    }
  };

  const policyAclEdit = async (policy, acl) => {
    const policyUuid = policy.uuid;
    try {
      const res = await apiClient.client.put(`auth/0.1/policies/${policyUuid}/acl/${acl}`, policy);
      return res
    } catch (e) {
      return e
    }
  };

  const policyAclDelete = async (policy, acl) => {
    const policyUuid = policy.uuid;
    try {
      const res = await apiClient.client.delete(`auth/0.1/policies/${policyUuid}/acl/${acl}`);
      return res;
    } catch (e) {
      return false;
    }
  };

  return {
    policiesAll,
    setPoliciesAll,
    policies,
    setPolicies,
    policySelected,
    setPolicySelected,
    policiesGet,
    policiesPageGet,
    policyGet,
    policyAdd,
    policyEdit,
    policyDelete,
    policyAclEdit,
    policyAclDelete
  };
};
