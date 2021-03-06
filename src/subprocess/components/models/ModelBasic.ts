/* eslint-disable @typescript-eslint/no-unused-vars */
import qm from "qminer";
import {
    EMethodStatus,
    EMethodType,
    IAggregatesModelParams,
    IALearnModelParams,
    IGenericModelParams,
    IKMeansModelParams,
    IMethodRecord,
    ISubsetRecord,
} from "../../../interfaces";

type paramType =
    | IGenericModelParams
    | IKMeansModelParams
    | IAggregatesModelParams
    | IALearnModelParams;

export default class ModelBasic {
    protected base: qm.Base;
    protected subset: ISubsetRecord;
    protected params: paramType;
    protected type: EMethodType;
    protected method: IMethodRecord;

    constructor(base: qm.Base, subset: ISubsetRecord, params: paramType, type: EMethodType) {
        this.base = base;
        this.subset = subset;
        this.params = params;
        this.type = type;
        // creates a new method with the default values
        const methodId = this.base.store("Methods").push({
            type: this.type,
            parameters: this.params,
            status: EMethodStatus.IN_QUEUE,
        });
        this.method = this.base.store("Methods")[methodId] as IMethodRecord;
        this.method.$addJoin("appliedOn", this.subset);
    }

    init(): any {
        throw new Error("Method 'init' is not implemented");
    }

    train(): any {
        throw new Error("Method 'train' is not implemented");
    }

    update(params: any) {
        throw new Error("Method 'update' is not implemented");
    }

    delete() {
        // clears and deletes the method
        this.method.deleted = true;
        this.method.status = EMethodStatus.FINISHED;
        this.method.$delJoin("appliedOn", this.subset);
    }

    getMethod() {
        return this.method;
    }

    getType() {
        return this.type;
    }

    save(fin: qm.fs.FIn) {
        throw new Error("Method 'save' is not implemented");
    }

    load(fout: qm.fs.FOut) {
        throw new Error("Method 'load' is not implemented");
    }
}
