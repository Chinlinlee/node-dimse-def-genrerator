const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const glob = require("glob");
const { appendClasspath, ensureJvm } = require("java-bridge");
const { TypescriptDefinitionGenerator } = require("java-ts-definition-generator");

async function replaceToString() {
    let tsFiles = glob.sync("**/*.ts", {
        root: path.join(__dirname, "./src/java-wrapper")
    });
    console.log("generate " + tsFiles.length + " typescript files");
    for(let tsFile of tsFiles) {
        let content = await readFile(tsFile, "utf-8");
        content = content.replace("public toString(): Promise<string>;", "public toString(): string;");
        await writeFile(tsFile, content, "utf-8");
    }
}


let depJarFiles = glob.sync("**/*.jar", {
    root: path.join(__dirname, "./java-jars")
});

ensureJvm();
for (let i = 0; i < depJarFiles.length; i++) {
    appendClasspath(depJarFiles);
}
// const generator = new TypescriptBulkDefinitionGenerator();
(async () => {
    const needGenerateClasses = [
        "org.dcm4che3.data.ElementDictionary",
        "org.dcm4che3.data.Tag",
        "org.dcm4che3.data.UID",
        "org.dcm4che3.data.Attributes",
        "org.dcm4che3.data.Sequence",
        "org.dcm4che3.data.VR",
        "org.dcm4che3.json.JSONWriter",
        "org.dcm4che3.io.DicomInputStream",
        "org.dcm4che3.io.DicomOutputStream",
        "org.dcm4che3.io.DicomInputStream$IncludeBulkData",
        "org.dcm4che3.media.DicomDirReader",
        "org.dcm4che3.media.DicomDirWriter",
        "org.dcm4che3.media.RecordFactory",
        "org.dcm4che3.media.RecordType",
        "org.dcm4che3.net.ApplicationEntity",
        "org.dcm4che3.net.Association",
        "org.dcm4che3.net.AssociationStateException",
        "org.dcm4che3.net.Commands",
        "org.dcm4che3.net.Connection",
        "org.dcm4che3.net.Device",
        "org.dcm4che3.net.Dimse",
        "org.dcm4che3.net.PDVInputStream",
        "org.dcm4che3.net.QueryOption",
        "org.dcm4che3.net.Status",
        "org.dcm4che3.net.TransferCapability",
        "org.dcm4che3.net.pdu.AAssociateRQ",
        "org.dcm4che3.net.pdu.ExtendedNegotiation",
        "org.dcm4che3.net.pdu.PresentationContext",
        "org.dcm4che3.net.service.BasicCEchoSCP",
        "org.dcm4che3.net.service.BasicCFindSCP",
        "org.dcm4che3.net.service.BasicCGetSCP",
        "org.dcm4che3.net.service.BasicCMoveSCP",
        "org.dcm4che3.net.service.BasicCStoreSCP",
        "org.dcm4che3.net.service.BasicMPPSSCP",
        "org.dcm4che3.net.service.BasicQueryTask",
        "org.dcm4che3.net.service.BasicRetrieveTask",
        "org.dcm4che3.net.service.DicomService",
        "org.dcm4che3.net.service.DicomServiceRegistry",
        "org.dcm4che3.net.service.InstanceLocator",
        "org.dcm4che3.tool.common.FilesetInfo",
        "org.dcm4che3.util.AttributesFormat",
        "org.dcm4che3.util.SafeClose",
        "org.dcm4che3.util.StringUtils",
        "org.dcm4che3.util.TagUtils",
        "org.dcm4che3.util.UIDUtils",
        "org.dcm4che3.tool.dcmqrscp.SendStgCmtResult",
        "org.github.chinlinlee.dcm777.net.BasicModCFindSCP",
        "org.github.chinlinlee.dcm777.net.BasicModQueryTask",
        "org.github.chinlinlee.dcm777.net.CFindSCPInject",
        "org.github.chinlinlee.dcm777.net.CStoreSCPInject",
        "org.github.chinlinlee.dcm777.net.PatientQueryTask",
        "org.github.chinlinlee.dcm777.net.PatientQueryTaskInject",
        "org.github.chinlinlee.dcm777.net.QueryTaskInject",
        "org.github.chinlinlee.dcm777.net.StudyQueryTask",
        "org.github.chinlinlee.dcm777.net.StudyQueryTaskInject",
        "org.github.chinlinlee.dcm777.net.SeriesQueryTask",
        "org.github.chinlinlee.dcm777.net.SeriesQueryTaskInject",
        "org.github.chinlinlee.dcm777.net.InstanceQueryTask",
        "org.github.chinlinlee.dcm777.net.InstanceQueryTaskInject",
        "org.github.chinlinlee.dcm777.net.SimpleCStoreSCP",
        "org.github.chinlinlee.dcm777.net.SimpleCMoveSCP",
        "org.github.chinlinlee.dcm777.net.SimpleCGetSCP",
        "org.github.chinlinlee.dcm777.net.SimpleStgCmtSCP",
        "org.github.chinlinlee.dcm777.dcmqrscp.SendStgCmtResult",
        "org.github.chinlinlee.dcm777.dcmqrscp.RetrieveTaskImpl",
        "org.github.chinlinlee.dcm777.common.Common",
        "org.github.chinlinlee.dcm2jpg.Dcm2JpgExecutor",
        "org.dcm4che3.tool.common.CLIUtils",
        "org.dcm4che3.net.SSLManagerFactory",
        "org.dcm4che3.audit.ActiveParticipant",
        "org.dcm4che3.audit.ActiveParticipantBuilder",
        "org.dcm4che3.audit.AuditMessage",
        "org.dcm4che3.audit.AuditMessages",
        "org.dcm4che3.audit.AuditMessages$EventActionCode",
        "org.dcm4che3.audit.AuditMessages$RoleIDCode",
        "org.dcm4che3.audit.AuditMessages$ParticipantObjectDataLifeCycle",
        "org.dcm4che3.audit.AuditMessages$ParticipantObjectIDTypeCode",
        "org.dcm4che3.audit.AuditMessages$ParticipantObjectTypeCode",
        "org.dcm4che3.audit.AuditMessages$ParticipantObjectTypeCodeRole",
        "org.dcm4che3.audit.AuditMessages$NetworkAccessPointTypeCode",
        "org.dcm4che3.audit.EventIdentification",
        "org.dcm4che3.audit.EventIdentificationBuilder",
        "org.dcm4che3.audit.ParticipantObjectDescription",
        "org.dcm4che3.audit.ParticipantObjectDetail",
        "org.dcm4che3.audit.ParticipantObjectIdentification",
        "org.dcm4che3.audit.ParticipantObjectIdentificationBuilder",
        "org.dcm4che3.audit.SOPClass",
        "org.dcm4che3.imageio.codec.TransferSyntaxType",
        "org.dcm4che3.imageio.codec.Transcoder",
        "jakarta.json.Json",
        "java.io.FileOutputStream",
    ];

    const generator = new TypescriptDefinitionGenerator(needGenerateClasses);
    // Generate definitions for the provided modules
    await generator.createModuleDeclarations();

    // Save the definitions to a directory
    await generator.save(path.join(__dirname, "./src/java-wrapper"));

    await replaceToString();
})();