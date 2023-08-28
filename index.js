const path = require("path");
const glob = require("glob");
const { appendClasspath, ensureJvm } = require("java-bridge");
const { TypescriptBulkDefinitionGenerator } = require("java-ts-definition-generator");

let depJarFiles = glob.sync("**/*.jar", {
    root: path.join(__dirname, "./java-jars")
});

ensureJvm();
for (let i = 0; i < depJarFiles.length; i++) {
    appendClasspath(depJarFiles);
}

const generator = new TypescriptBulkDefinitionGenerator();

(async () => {
    // Generate definitions for the provided modules
    await generator.generate([
        "org.dcm4che3.data.Tag",
        "org.dcm4che3.data.UID",
        "org.dcm4che3.data.Attributes",
        "org.dcm4che3.data.Sequence",
        "org.dcm4che3.data.VR",
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
        "org.github.chinlinlee.dcm777.net.QueryTaskOptions",
        "org.github.chinlinlee.dcm777.net.StudyQueryTask",
        "org.github.chinlinlee.dcm777.net.StudyQueryTaskInject",
        "org.github.chinlinlee.dcm777.net.SeriesQueryTask",
        "org.github.chinlinlee.dcm777.net.SeriesQueryTaskInject",
        "org.github.chinlinlee.dcm777.net.SimpleCStoreSCP",
        "org.github.chinlinlee.dcm777.net.SimpleCMoveSCP",
        "org.github.chinlinlee.dcm777.net.SimpleCGetSCP",
        "org.github.chinlinlee.dcm777.net.SimpleStgCmtSCP",
        "org.github.chinlinlee.dcm777.dcmqrscp.SendStgCmtResult",
        "org.github.chinlinlee.dcm777.dcmqrscp.RetrieveTaskImpl",
        "org.dcm4che3.tool.common.CLIUtils",
        "org.dcm4che3.net.SSLManagerFactory"
    ]);

    // Save the definitions to a directory
    await generator.save(path.join(__dirname, "./src/java-wrapper"));
})();