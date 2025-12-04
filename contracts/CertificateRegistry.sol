// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateRegistry {
    struct Document {
        bytes32 docHash;
        string studentId;
        string studentName;
        string docType;
        string courseName;
        string docData;
        string issuerName;
        uint256 issuedDate;
        bool isValid;
    }

    mapping(bytes32 => Document) public documents;
    mapping(string => bytes32[]) private studentHistory;
    address public owner;

    event DocumentIssued(bytes32 indexed docHash, string studentId, string docType);

    constructor() {
        owner = msg.sender;
    }

    function issueDocument(
        bytes32 _docHash, 
        string memory _studentId, 
        string memory _studentName,
        string memory _docType,
        string memory _courseName,
        string memory _docData,
        string memory _issuerName
    ) external {
        require(documents[_docHash].issuedDate == 0, "Document already exists");

        documents[_docHash] = Document({
            docHash: _docHash,
            studentId: _studentId,
            studentName: _studentName,
            docType: _docType,
            courseName: _courseName,
            docData: _docData,
            issuerName: _issuerName,
            issuedDate: block.timestamp,
            isValid: true
        });

        studentHistory[_studentId].push(_docHash);
        emit DocumentIssued(_docHash, _studentId, _docType);
    }

    function verifyDocument(bytes32 _docHash) external view returns (
        bool isValid, 
        string memory studentName, 
        string memory docType, 
        string memory docData, 
        string memory issuerName, 
        uint256 issuedDate
    ) {
        Document memory doc = documents[_docHash];
        if(doc.issuedDate == 0) return (false, "", "", "", "", 0);
        return (doc.isValid, doc.studentName, doc.docType, doc.docData, doc.issuerName, doc.issuedDate);
    }

    function getStudentDocuments(string memory _studentId) external view returns (bytes32[] memory) {
        return studentHistory[_studentId];
    }
}